import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FestivalsListComponent } from './components/festival/festivals-list/festivals-list.component';
import { FestivalDetailsComponent } from './components/festival/festival-details/festival-details.component';
import { MessageComponent } from './components/shared/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EditorDetailsComponent } from './components/editor/editor-details/editor-details.component';
import { EditorListComponent } from './components/editor/editor-list/editor-list.component';
import { GamesListComponent } from './components/game/games-list/games-list.component';
import { GameDetailsComponent } from './components/game/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FestivalsListComponent,
    FestivalDetailsComponent,
    MessageComponent,
    RootComponent,
    EditorDetailsComponent,
    EditorListComponent,
    GamesListComponent,
    GameDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'festivals', component: AppComponent },
      { path: 'festival/:festivalId', component: FestivalDetailsComponent },
      // { path: 'App', component: AppComponent },
      { path: '', redirectTo: '/festivals', pathMatch: 'full' },
      // { path: '**', component: PageNotFoundComponent },
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
