import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { SmartResizeDirective } from './shared/smart-resize.directive';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FrontendLayoutComponent } from './layouts/frontend-layout.component';
import { HeaderComponent } from './layouts/header.component';
import { FooterComponent } from './layouts/footer.component';
import { P404Component } from './pages/404.component';

// Shared
import { AuthGuard } from './model/auth.guard';
import { SharedModule } from './shared/shared.module';
import { CompareModule } from './compare/compare.module';
import { LoginModule } from './login/login.module';
import { ChatModule } from './chat/chat.module';

// Model & Services
import { GlobalService } from './model/global.service';
import { UserService } from './model/user.service';
import { UserDataService } from './model/user-data.service';
import { SettingDataService } from './model/setting-data.service';
import { SearchService } from './model/search.service';
import { MapService } from './model/map.service';
import { SchoolDataService } from './model/school-data.service';
import { CourseDataService } from './model/course-data.service';
import { CompareService } from './model/compare.service';

import { MessageService } from './model/message.service';
import { ThreadService } from './model/thread.service';

import { AgmCoreModule } from '@agm/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyAVHeYMn-9TSAZG5OmlW6xhem5Lpd9fe2s",
          libraries: ["places"]
        }),
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        ChartsModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        SharedModule,
        CompareModule,
        LoginModule,
        ChatModule,
    ],
    declarations: [
        AppComponent,
        FrontendLayoutComponent,
        HeaderComponent,
        FooterComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        SmartResizeDirective,
        P404Component,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        AuthGuard,
        UserService,
        GlobalService,
        SettingDataService,
        UserDataService,
        SearchService,
        MapService,
        SchoolDataService,
        CourseDataService,
        CompareService,
        MessageService,
        ThreadService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
