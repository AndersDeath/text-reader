import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'text-edit-page',
  templateUrl: './text-edit-page.component.html',
  styleUrls: ['./text-edit-page.component.scss']
})
export class TextEditPageComponent implements OnInit {
  public form: UntypedFormGroup;
  public userData: any;
  tinyApi = environment.tinyApiKey
  isNew = true;
  public pageId: any;
  constructor(
    private authService: AuthService,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: [null, []],
      summary: [null, []],
      message: [null, []],
    });
  }

  ngOnInit(): void {
    this.userData = this.authService.userData;
    this.route.params.subscribe((e: any) => {
      this.pageId = e.id;
      if(e.id !== 'add') {
        this.isNew = false;
        console.log(e.id);
        this.authService.getText(this.userData, e.id).subscribe((text) => {
          console.log(text.data())
          const data = text.data();
          this.form.setValue({
            title: data.title || '',
            summary: data.summary || '',
            message: data.text || '',
          });
        })
      }
    })
   
  }

  logout() {
    this.authService.signOut();
  }

  sendFormData(form: any) {
    if(this.isNew) {
      this.authService.writeMessage(this.userData, form.value.message).then((e) => [
        console.log(e)
      ]);
    } else {
      this.authService.updateMessage(this.pageId, this.userData, form.value.message).then((e) => [
        console.log(e)
      ]);
    }
  }

}
