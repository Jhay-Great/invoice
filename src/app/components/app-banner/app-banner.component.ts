import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// local module import
import { AppState } from '../../interfaces/AppState.interface';
import { selectTheme } from '../../state/theme/selector/themeSelector';

@Component({
  selector: 'app-app-banner',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app-banner.component.html',
  styleUrl: './app-banner.component.css'
})
export class AppBannerComponent {
  state:Observable<string> = this.store.select(selectTheme)

  constructor (
    private store: Store<AppState>
  ) {
    this.state.subscribe(val => console.log(val))
  };

}
