import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export class AbstractService {
  constructor(private toastr: ToastrService) {}

  protected async withNotification(
    func: () => Promise<any> | Observable<any>,
    message?: string
  ): Promise<any> {
    try {
      const result = await func();

      message && this.toastr.success(message);
      return result;
    } catch (err: any) {
      this.toastr.error(err);
    }
  }
}
