import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  TitleCasePipe,
  DecimalPipe,
} from '@angular/common';
import { ActionMenu } from './components/action-menu';
import { ReportService } from '../services/reports.service';
import { Report } from '../interfaces/report';

@Component({
  selector: 'ucea-reports-approval-queue',
  standalone: true,
  imports: [CommonModule, ActionMenu, CurrencyPipe, TitleCasePipe, DecimalPipe],
  templateUrl: './reports-approval-queue.component.html',
  styleUrl: './reports-approval-queue.component.scss',
})
export class ReportsApprovalQueueComponent {
  @ViewChildren(ActionMenu) actionMenuElements!: QueryList<ActionMenu>;
  reports: Report[] = [];

  constructor(private reportsService: ReportService) {}

  async ngOnInit() {
    this.reports = await this.reportsService.getNewReports();
    document.querySelector('body')?.addEventListener('click', () => {
      this.activeMenu?.hide();
    });
  }

  get activeMenu() {
    return this.actionMenuElements.find((i) => i.isShown);
  }

  toggleActionMenu(evt: MouseEvent, id: string) {
    evt.stopPropagation();
    const activeEl = this.activeMenu;
    const clickedEl = this.actionMenuElements.find((i) => i.reportId === id)!;

    if (!activeEl) return clickedEl.show();
    if (activeEl.reportId === clickedEl.reportId) return activeEl.hide();

    activeEl.hide();
    clickedEl.show();
  }
}
