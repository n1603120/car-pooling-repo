import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";
import {TripService} from "../services/trip.service";
import {Trip} from "../model/trip";
import {PeopleService} from "../services/person.service";
import {Router} from "@angular/router";
import {Car} from "../model/car";
import {CarService} from "../services/car.service";


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  title = 'ReactiveForms';
  tripForm: FormGroup;
  submitted: boolean = false;
  timeValid: boolean = false;
  town: string = "";
  driverStatus: boolean = false;
  private dataError: ValidationErrors | null | undefined;
  currentlyActiveCar!: Car;
  townsSelected:string[] = [];

  constructor(private formBuilder: FormBuilder, private readonly router: Router, private tripService: TripService, private peopleService: PeopleService, private carService: CarService) {
    this.tripForm = formBuilder.group({
      tripPostcode: ['', createRequiredRegexValidator(/[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/)],
      tripTown:['', Validators.required],
      tripDestination: ['', Validators.required],
      tripDate: [this.getCurrentDate(), Validators.required],
      tripTime: [this.getCurrentTime(), Validators.required]
    });
  }
  onSubmit(){
    this.submitted = true;
    this.checkTimeValid();
    if(!this.tripForm.valid || !this.timeValid){
      return;
    }
    this.submitTrip();
    this.moveToCorrectPage();
  }
  ngOnInit(): void {
    this.fetchActiveCar();
    this.fetchDriverStatus();
  }
  getCurrentDate():string{
    return (new Date()).toISOString().substring(0,10);
  }
  getCurrentTime():string{
    return (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  checkTimeValid():void{
    // validates that if the current day is selected, they can't choose a time before the current time
    console.log(this.tripForm.value.tripDate);
    console.log(this.getCurrentDate());
    if(this.tripForm.value.tripDate === this.getCurrentDate()){
      this.timeValid = this.tripForm.value.tripTime >= this.getCurrentTime();
      if(!this.timeValid){
        // @ts-ignore
        document.getElementById("tripTime").style.border = '2pt solid red';
      }
    }
    else{
      this.timeValid = true;
    }
    if(this.timeValid){
      // @ts-ignore
      document.getElementById("tripTime").style.border = '1pt solid black';
    }
  }

  errorPresent(tripData: string): boolean {
    this.dataError = this.tripForm.get(tripData)?.errors;
    if(tripData === "tripTown" && this.townsSelected.length > 0){
      // @ts-ignore
      document.getElementById(tripData).style.border = '0pt';
      return false;
    }
    if(this.dataError){
      // @ts-ignore
      document.getElementById(tripData).style.border = '2pt solid red';
      return true;
    }
    else{
      if(tripData === "tripTown"){
        // @ts-ignore
        document.getElementById(tripData).style.border = '0pt';
        return false;
      }
      // @ts-ignore
      document.getElementById(tripData).style.border = '1pt solid black';
      return false;
    }
  }

  private submitTrip(){
    const postcode = this.tripForm.get('tripPostcode')?.value;
    const destination = this.tripForm.get('tripDestination')?.value;
    const date = this.tripForm.get('tripDate')?.value;
    const time = this.tripForm.get('tripTime')?.value;
    let town: string;
    if(this.townsSelected.length > 0){
      town = this.townsSelected.toString().trim();
    }else{
      town = this.tripForm.get('tripTown')?.value;
      town = town.toString().trim();
    }
    if(this.driverStatus){
      const currentTrip = new Trip(this.peopleService.currentPerson.id,postcode,town, destination, date, time,this.currentlyActiveCar.id);
      this.tripService.addTrip(currentTrip).subscribe((data) => {});
      this.tripService.currentTrip = currentTrip;
    }else{
      const currentTrip = new Trip(this.peopleService.currentPerson.id,postcode,town, destination, date, time,0);
      this.tripService.addTrip(currentTrip).subscribe((data) => {});
      this.tripService.currentTrip = currentTrip;
    }
  }

  private async fetchActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.currentlyActiveCar = car);
    await this.delay(100);
    this.fillPickUpPoints();
  }

  private fetchDriverStatus() {
    this.driverStatus = this.peopleService.driverStatus;
  }

  onChange(): void{
    // @ts-ignore
    this.town = document.getElementById("selectedTown").innerText.trim();
    if(this.town.length > 0){
      if(this.townsSelected.includes(this.town)){
        return;
      }else {
        // @ts-ignore
        this.townsSelected.push(document.getElementById("selectedTown").innerText.trim());
      }
      console.log(this.townsSelected.toString());
    }
  }

  onRemove(townToBeRemoved: string): void{
    this.townsSelected = this.townsSelected .filter(town => town !== townToBeRemoved);
    console.log(this.townsSelected);
  }

  private fillPickUpPoints() {
    console.log(this.currentlyActiveCar);
    if(this.driverStatus){
      console.log(this.currentlyActiveCar.preferredPickUp)
      this.townsSelected = this.currentlyActiveCar.preferredPickUp.split(",");
      console.log(this.townsSelected);
    }
  }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private moveToCorrectPage() {
    if(this.driverStatus){
      this.router.navigate(["/summary"]);
    }
    else{
      this.router.navigate(["/passenger-results"]);
    }
  }
  towns: string[] = ["Acton",
    " Aghacommon",
    " Aghadowey",
    " Aghadrumsee",
    " Aghagallon",
    " Aghalee",
    " Ahoghill",
    " Aldergrove",
    " Altamuskin",
    " Altishane",
    " Altmore",
    " Annaclone",
    " Annaghmore",
    " Annahilt",
    " Annahugh",
    " Annalong",
    " Annsborough",
    " Antrim",
    " Ardboe",
    " Ardgarvan",
    " Ardglass",
    " Ardmore",
    " Ardstraw",
    " Armagh",
    " Armoy",
    " Arney",
    " Articlave",
    " Artigarvan",
    " Artikelly",
    " Atticall",
    " Aughafatten",
    " Augher",
    " Aughnacloy",
    "Ballela",
    " Ballerin",
    " Ballinamallard",
    " Ballintoy",
    " Balloo",
    " Ballybogy",
    " Ballycarry",
    " Ballycassidy",
    " Ballycastle",
    " Ballyclare",
    " Ballyeaston",
    " Ballygally",
    " Ballygawley",
    " Ballygowan",
    " Ballyhalbert",
    " Ballyhornan",
    " Ballykelly",
    " Ballykinler",
    " Ballylesson",
    " Ballylinney",
    " Ballymacmaine",
    " Ballymacnab",
    " Ballymagorry",
    " Ballymartin",
    " Ballymaguigan",
    " Ballymena",
    " Ballymoney",
    " Ballynahinch",
    " Ballynure",
    " Ballyrashane",
    " Ballyrobert",
    " Ballyronan",
    " Ballyrory",
    " Ballyscullion",
    " Ballyskeagh",
    " Ballystrudder",
    " Ballyvoy",
    " Ballywalter",
    " Balnamore",
    " Banagher",
    " Banbridge",
    " Bangor",
    " Bannfoot",
    " Belcoo",
    " Belfast",
    " Bellaghy",
    " Bellanaleck",
    " Bellarena",
    " Belleek",
    " Belleeks",
    " Benburb",
    " Bendooragh",
    " Beragh",
    " Bessbrook",
    " Blackskull",
    " Blackwatertown",
    " Blaney",
    " Bleary",
    " Boho",
    " Brackaville",
    " Bready",
    " Brockagh",
    " Brookeborough",
    " Broomhill",
    " Broughshane",
    " Bryansford",
    " Buckna",
    " Burnfoot",
    " Burren",
    " Bushmills",
    "Caledon",
    " Camlough",
    " Campsie",
    " Capecastle",
    " Cappagh",
    " Cargan",
    " Carnalbanagh",
    " Carncastle",
    " Carnlough",
    " Carnteel",
    " Carrickaness",
    " Carrickfergus",
    " Carrickmore",
    " Carrowclare",
    " Carrowdore",
    " Carrybridge",
    " Carryduff",
    " Castlecaulfield",
    " Castledawson",
    " Castlederg",
    " Castlerock",
    " Castlewellan",
    " Charlemont",
    " Clabby",
    " Clady",
    " Clady",
    " Cladymore",
    " Clanabogan",
    " Claudy",
    " Clogh",
    " Clogher",
    " Cloghy",
    " Clonmore",
    " Clonoe",
    " Clough",
    " Cloughmills",
    " Coagh",
    " Coalisland",
    " Cogry-Kilbride",
    " Coleraine",
    " Collegeland",
    " Comber",
    " Conlig",
    " Cookstown",
    " Corbet",
    " Corkey",
    " Corrinshego",
    " Craigarogan",
    " Craigavon",
    " Cranagh",
    " Cranford",
    " Crawfordsburn",
    " Creagh",
    " Creggan",
    " Crossgar",
    " Crossmaglen",
    " Crumlin",
    " Cullaville",
    " Cullybackey",
    " Cullyhanna",
    " Culmore",
    " Culnady",
    " Curran",
    " Cushendall",
    " Cushendun",
    "Darkley",
    " Derry",
    " Derrycrin",
    " Derrygonnelly",
    " Derryhale",
    " Derrykeighan",
    " Derrylin",
    " Derrymacash",
    " Derrymore",
    " Derrynaflaw",
    " Derrynoose",
    " Derrytrasna",
    " Derrytresk",
    " Derryvore",
    " Dervock",
    " Desertmartin",
    " Doagh",
    " Dollingstown",
    " Donagh",
    " Donaghadee",
    " Donaghcloney",
    " Donaghey",
    " Donaghmore",
    " Donegore",
    " Dooish",
    " Dorsey",
    " DouglasBridge",
    " Downhill",
    " Downpatrick",
    " Draperstown",
    " DrinnsBay",
    " Dromara",
    " Dromintee",
    " Dromore",
    " Dromore",
    " Drumaness",
    " Drumbeg",
    " Drumbo",
    " Drumlaghy",
    " Drumlough",
    " Drumlough",
    " Drummullan",
    " Drumnacanvy",
    " Drumnakilly",
    " Drumquin",
    " Drumraighland",
    " Drumsurn",
    " Dunadry",
    " Dundonald",
    " Dundrod",
    " Dundrum",
    " Dungannon",
    " Dungiven",
    " Dunloy",
    " Dunnamanagh",
    " Dunmurry",
    " Dunnamore",
    " Dunnaval",
    " Dunseverick",
    "Edenaveys",
    " Edenderry",
    " Edenderry",
    " Ederney",
    " Eglinton",
    " Eglish",
    " Enniskillen",
    " Erganagh",
    " Eskra",
    "Feeny",
    " Finaghy",
    " Fintona",
    " Finvoy",
    " Fivemiletown",
    " Florencecourt",
    " Foreglen",
    " Forkill",
    "Galbally",
    " Gamblestown",
    " Garrison",
    " Garvagh",
    " Garvaghey",
    " Garvetagh",
    " Gawley'sGate",
    " Gibson'sHill",
    " Gilford",
    " Gillygooly",
    " Glack",
    " Glebe",
    " Glenarm",
    " Glenavy",
    " Glencull Glengormley",
    " Glenmornan",
    " Glenoe",
    " Glenone",
    " Glynn",
    " Gortaclare",
    " Gortin",
    " Gortnahey",
    " Goshedan",
    " Gracehill",
    " GrangeCorner",
    " Granville",
    " Greencastle",
    " Greenisland",
    " Greyabbey",
    " Greysteel",
    " Groggan",
    " Groomsport",
    " Gulladuff",
    "HalfpennyGate",
    " Hamiltonsbawn",
    " Helen'sBay",
    " Hillhall",
    " Hillsborough",
    " Hilltown",
    " Holywell",
    " Holywood",
    "Inishrush",
    " Irvinestown",
    " Islandmagee",
    "Jonesborough",
    " Jerrettspass",
    " Jordanstown",
    "Katesbridge",
    " Keady",
    " Kells-Connor",
    " Kellswater",
    " Kesh",
    " Keshbridge",
    " Kilcoo",
    " Kildress",
    " Kilkeel",
    " Killadeas",
    " Killaloo",
    " Killay",
    " Killead",
    " Killeen",
    " Killen",
    " Killeter",
    " Killinchy",
    " Killough",
    " Killowen",
    " Killylea",
    " Killyleagh",
    " Killyman",
    " Killywool",
    " Kilmore",
    " Kilmore",
    " Kilrea",
    " Kilskeery",
    " Kinallen",
    " Kinawley",
    " Kircubbin",
    " Knockcloghrim",
    " Knockmoyle",
    " Knocknacarry",
    "Lack",
    " Lambeg",
    " Landahaussy",
    " Largy",
    " Larne",
    " Laurelvale",
    " Lawrencetown",
    " Leitrim",
    " Letterbreen",
    " Lettershendoney",
    " Limavady",
    " Lisbellaw",
    " Lislea",
    " Lisnadill",
    " Lisnarick",
    " Lisnaskea",
    " Listooder",
    " Loughbrickland",
    " Loughgall",
    " Loughgilly",
    " Loughguile",
    " Loughinisland",
    " Loughmacrory",
    " Loup",
    " LowerBallinderry",
    " Lurgan",
    " Lurganare",
    " Lurganure",
    " Lurganville",
    "Macken",
    " Macosquin",
    " Madden",
    " Maghaberry",
    " Maghera",
    " Magheraconluce",
    " Magherafelt",
    " Magheralin",
    " Magheramason",
    " Magheramorne",
    " Magheraveely",
    " Maghery",
    " Maguiresbridge",
    " Markethill",
    " Martinstown",
    " Maydown",
    " Mayobridge",
    " Mazetown",
    " Meigh",
    " Middletown",
    " Milford",
    " Millbank",
    " MillBay",
    " Millisle",
    " Milltown",
    " Moira",
    " Monea",
    " Moneyglass",
    " Moneymore",
    " Moneyneany",
    " Moneyreagh",
    " Moneyslane",
    " Monteith",
    " Moortown",
    " Moss-Side",
    " Mountfield",
    " Mountjoy",
    " Mounthill",
    " Mountnorris",
    " Moy",
    " Moygashel",
    " Mullaghbawn",
    " Mullaghboy",
    " Mullaghbrack",
    " Mullaghglass",
    " Mallusk",
    "Newbuildings",
    " Newcastle",
    " Newry",
    " NewtownCrommelin",
    " Newtownabbey",
    " Newtownards",
    " Newtownbutler",
    " Newtowncloghoge",
    " Newtownhamilton",
    " Newtownstewart",
    " Nixon'sCorner",
    " Newmills",
    "Omagh",
    " Orritor",
    "Park",
    " Parkgate",
    " Plumbridge",
    " Pomeroy",
    " Portadown",
    " Portaferry",
    " Portavogie",
    " Portballintrae",
    " Portbraddon",
    " Portglenone",
    " Portrush",
    " Portstewart",
    " Poyntzpass",
    "Raloo",
    " Randalstown",
    " Rasharkin",
    " Rathfriland",
    " Ravernet",
    " Richhill",
    " Ringsend",
    " Rock",
    " Rosslea",
    " Rostrevor",
    " Roughfort",
    " Rousky",
    "Saintfield",
    " Sandholes",
    " Scarva",
    " ScotchStreet",
    " Seaforde",
    " Seskinore",
    " Shanmaghery",
    " Shanvey",
    " Sheeptown",
    " Shrigley",
    " Silverbridge",
    " SionMills",
    " Sixmilecross",
    " Skea",
    " Spa",
    " Spamount",
    " Springfield",
    " Stewartstown",
    " Stoneyford",
    " Strabane",
    " Straid",
    " Straidarran",
    " Strangford",
    " Stranocum",
    " Strathfoyle",
    " Straw",
    " Swatragh",
    "Tamlaght",
    " Tamlaght",
    " Tamnamore",
    " Tandragee",
    " Tartaraghan",
    " Teemore",
    " Templepatrick",
    " Tempo",
    " TheBirches",
    " Tobermore",
    " Toome",
    " Trillick",
    " Trory",
    " Tullyhogue",
    " Tullyhommon",
    " Tullylish",
    " Tullynacross",
    " Tullywiggan",
    " Tynan",
    "UpperBallinderry",
    " Upperlands",
    "VictoriaBridge",
    "Waringsford",
    " Waringstown",
    " Warrenpoint",
    " WashingBay",
    " Waterfoot",
    " Whitecross",
    " Whitehead",
    " Whiterock",
    " Whitehouse",
    " Whitehouse",];

}
