import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";
import {CarService} from "../services/car.service";
import {Person} from "../model/person";
import {Car} from "../model/car";
import {PeopleService} from "../services/person.service";
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

  address: string = '';
  preferredContact = '';
  smokingOption = '';
  accessibility = '';



  isEmail: boolean = false;
  isPhone: boolean = false;

  rows: any[] = [{
    checked:false,
    key:'',
    value:''
  }];


  onSubmit(): void {
    this.submitted = true;
   // console.log(this.driverForm);
    if(!this.driverForm.valid) {
      return;
    }
    this.submitDriver();
    console.log("Valid");
  }
  constructor(private formBuilder: FormBuilder, private carService: CarService, private peopleService: PeopleService ) {
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
   // console.log(this.allCars);
  }

  isEmailCheck(): void{
    this.isEmail =! this.isEmail;
  }

  isPhoneCheck(): void{
    this.isPhone =! this.isPhone;
  }

  errorPresent(driverData: string): boolean {
    this.dataError = this.driverForm.get(driverData)?.errors
    if(this.dataError){
      // @ts-ignore
      document.getElementById(driverData).style.border = '2pt solid red';
      return true;
    }
    else{
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


  submitDriver() : any {
    const carMake = this.driverForm.get('driverCarMake')?.value;
    const registration = this.driverForm.get('driverReg')?.value;
    const noOfPassengers = this.driverForm.get('driverNoOfPassengers')?.value;
    const preferredOption = this.driverForm.get('driverPreferredOption')?.value;
    const smokingOption = this.driverForm.get('driverSmokingOption')?.value;
    const accessibility = this.driverForm.get('driverAccessibility')?.value;
    const pickUpAddress = this.townsSelected.toString();

    const currentDriver = new Car(0, carMake,registration, noOfPassengers, preferredOption, smokingOption, accessibility, pickUpAddress, true)
    //console.log(currentDriver);
    this.carService.addCar(currentDriver);
  }
  town:string = "";
  townsSelected:string[] = [];
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
