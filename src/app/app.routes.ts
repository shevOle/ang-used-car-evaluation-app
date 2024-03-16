import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsListComponent } from './reportsList/reportsList.component';
import { ReportPageComponent } from './reportPage/reportPage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'reports',
    component: ReportsListComponent,
    title: 'Reports',
  },
  {
    path: 'reports/:id',
    component: ReportPageComponent,
    title: 'Report details',
  },
];
