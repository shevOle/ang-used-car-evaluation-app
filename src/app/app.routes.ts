import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportsListComponent } from './reportsList/reportsList.component';
import { ReportPageComponent } from './reportPage/reportPage.component';
import { ReportEstimateComponent } from './report-estimate/report-estimate.component';
import { AddReportComponent } from './add-report/add-report.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsListComponent,
    title: 'Reports',
    canActivate: [AuthGuard],
  },
  {
    path: 'reports/:id',
    component: ReportPageComponent,
    title: 'Report details',
    canActivate: [AuthGuard],
  },
  {
    path: 'estimate',
    component: ReportEstimateComponent,
    title: 'Get estimate price',
    canActivate: [AuthGuard],
  },
  {
    path: 'add-report',
    component: AddReportComponent,
    title: 'Add report',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Log in',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign up',
  },
];
