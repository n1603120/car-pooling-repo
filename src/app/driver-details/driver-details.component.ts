import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";
import {CarService} from "../services/car.service";
import {Person} from "../model/person";
import {Car} from "../model/car";
import {PeopleService} from "../services/person.service";
import {Router} from "@angular/router";
import {NgSelectComponent} from "@ng-select/ng-select";




@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  title = 'ReactiveForms';
  driverForm: FormGroup;
  submitted = false;
  private dataError: ValidationErrors | null | undefined;
  allCars: Car[] = [];
  currentPerson!: Person;
  private currentlyActiveCar!: Car;
  address: string = '';
  preferredContact = '';
  smokingOption = '';
  accessibility = '';
  town:string = "";
  townsSelected:string[] = [];
  isEmail: boolean = false;
  isPhone: boolean = false;
  rows: any[] = [{
    checked:false,
    key:'',
    value:''
  }];

  constructor(private formBuilder: FormBuilder,private readonly router: Router, private carService: CarService, private peopleService: PeopleService ) {
    this.driverForm = formBuilder.group({
      driverCarMake: ['', Validators.required],
      driverReg: ['', createRequiredRegexValidator(/\b[a-z]{2}([1-9]|0[2-9]|6[0-9]|1[0-9])[a-z]{3}|[A-HJ-NP-Y]\d{1,3}[A-Z]{3}|[A-Z]{3}\d{1,3}[A-HJ-NP-Y]|(?:[A-Z]{1,2}\d{1,4}|[A-Z]{3}\d{1,3})|(?:\d{1,4}[A-Z]{1,2}|\d{1,3}[A-Z]{3})\b/i)],
      driverNoOfPassengers: ['1', Validators.required],
      driverPreferredContact: ['', Validators.required],
      driverSmokingOption: ['' ,Validators.required],
      driverAccessibility: ['',Validators.required],
      driverPickUp: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.fetchAllCars();
    this.getCurrentPerson();
    this.fetchActiveCar();
    console.log(this.allCars);
  }

  onSubmit(): void {
    this.submitted = true;
    if(!this.driverForm.valid) {
      return;
    }
    this.submitDriver();
    this.router.navigate(['/trip-details']);
  }
  isEmailCheck(): void{
    this.isEmail =! this.isEmail;
  }

  isPhoneCheck(): void{
    this.isPhone =! this.isPhone;
  }

  errorPresent(driverData: string): boolean {
    this.dataError = this.driverForm.get(driverData)?.errors;
    if(driverData === "driverPickUp" && this.townsSelected.length > 0){
      // @ts-ignore
      document.getElementById(driverData).style.border = '0pt';
      return false;
    }
    if(this.dataError){
      // @ts-ignore
      document.getElementById(driverData).style.border = '2pt solid red';
      return true;
    }
    else{
      if(driverData === "driverPickUp"){
        // @ts-ignore
        document.getElementById(driverData).style.border = '0pt';
        return false;
      }
      // @ts-ignore
      document.getElementById(driverData).style.border = '1pt solid black';
      return false;
    }
  }

  checkAndAddRow(i:number){
    this.rows[i].checked = true;
    if(this.rows.length - 1 == i){
      this.rows.push({
        checked:false,
        key:'',
        value:''
      })
    }
  }
  private fetchAllCars() {
    this.carService
      .getAllCars()
      .subscribe(
        cars => cars.forEach( car => this.allCars.push(car))
      )
  }

  private getCurrentPerson(): void{
    this.currentPerson = this.peopleService.currentPerson;
  }


  private submitDriver() : any {
    const carMake = this.driverForm.get('driverCarMake')?.value;
    const registration = this.driverForm.get('driverReg')?.value;
    const noOfPassengers = this.driverForm.get('driverNoOfPassengers')?.value;
    const preferredContact = this.driverForm.get('driverPreferredContact')?.value;
    const smokingOption = this.driverForm.get('driverSmokingOption')?.value;
    const accessibility = this.driverForm.get('driverAccessibility')?.value;
    let pickUpAddress: string;
    if(this.townsSelected.length > 0){
      pickUpAddress = this.townsSelected.toString();
    }else{
      pickUpAddress = this.driverForm.get('driverPickUp')?.value;
    }

    if(this.currentlyActiveCar){
      this.currentlyActiveCar.activeCar = false;
      this.removeCurrentlyActiveCar();
    }
    const currentDriver = new Car(this.peopleService.currentPerson.id, carMake,registration, noOfPassengers, preferredContact, smokingOption, accessibility, pickUpAddress, true)
    this.carService.addCar(currentDriver).subscribe((data) => {});
  }

  private fetchActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.currentlyActiveCar = car);


  }

  onChange(): void{
    // @ts-ignore
    this.town =document.getElementById("selectedTown").innerText.trim();
    if(this.townsSelected.includes(this.town)){
     return;
   }else {
      // @ts-ignore
      this.townsSelected.push(document.getElementById("selectedTown").innerText.trim());
    }
    console.log(this.townsSelected.toString());
  }
  onRemove(townToBeRemoved: string): void{
    this.townsSelected = this.townsSelected .filter(town => town !== townToBeRemoved);
    console.log(this.townsSelected);
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

  private removeCurrentlyActiveCar() {
    this.carService
      .update(this.currentlyActiveCar)
      .subscribe((data) => {
        }
      );
  }
}
