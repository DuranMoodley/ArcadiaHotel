/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { setGlobal } from 'reactn'
console.disableYellowBox = true;

setGlobal({
  Organisation: 'All Organisations',
  OrganisationId: 0,
  Weighbridge: 'All Weighbridges',
  WeighbridgeId: 0,
  UserGuid: '',
  data: [],
  UserToken: '',
  employeeSelect: {},
  clientSelect:{},
  currentScreenIndex: 0,
  isLoggedIn: false,
  filterType: 'T',
  WeighbridgeIdSelected: ' ',
  SiteDrillDownOption : 'Orders',
  refreshData: false,
  SelectedWeighbridge: '',
  SacannedObject: {},
  TicketType : '',
  dataSQLite : [],
  isSystem : false,
  isQRDetailsShown : false,
  MobileErrorDetails : {},
  FullName: 'Duran Moodley',
  HaulierName:'',
  HaulierId:0,
  InductionSearch: '',
  isLoad : 'Today',
  LastLoadTime : '',
  VehicleId : 0,
  DriverId:0,
  refreshInductionTabs : false,
  screenTabs: '',
  InductionType: ''
})
AppRegistry.registerComponent(appName, () => App);
