import { NgModule } from '@angular/core';
import {AddDayModalComponent} from "./addDayModal/add-day-modal.component";
import {DeleteModalComponent} from "./deleteModal/delete-modal.component";
import {EditModalComponent} from "./editModal/edit-modal.component";
import {NewTaskModalComponent} from "./newTaskModal/new-task-modal.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    declarations: [
        AddDayModalComponent,
        DeleteModalComponent,
        EditModalComponent,
        NewTaskModalComponent],
    exports: [
        AddDayModalComponent,
        DeleteModalComponent,
        EditModalComponent,
        NewTaskModalComponent
    ]
})
export class ModalsModule { }

