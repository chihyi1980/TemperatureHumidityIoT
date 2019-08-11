import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GlobalVars } from '../../providers/globalVars';
declare var andJS: any;

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private globalVar: GlobalVars,) {

  }

  isAdminUser()
  {
    var currUser = andJS.getCurrUser();
    if(currUser == 'admin' || currUser == 'Admin')
    {
      return true;
    }else
    {
      return false;
    }
  }
}
