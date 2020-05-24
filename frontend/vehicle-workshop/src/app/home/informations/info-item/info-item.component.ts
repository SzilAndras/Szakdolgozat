import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InfoInterface} from "../../../shared/model/interfaces/info.interface";
import {InfoTypeEnum} from "../../../shared/model/enums/info-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})
export class InfoItemComponent implements OnInit {

  form: FormGroup;

  @Input() info: InfoInterface;
  @Input() editable: boolean;
  @Input() selectable: boolean;
  @Input() types: {type: InfoTypeEnum, label: String}[];

  @Output() selected: EventEmitter<number> = new EventEmitter();
  @Output() save: EventEmitter<InfoInterface> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();



  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      type: this.info?.type || null,
      label: this.info?.label || '',
      value: this.info?.value ||''
    })
  }

  onSelect() {
    this.selected.emit(this.info.id);
  }

  onCancel() {
    this.selected.emit(null);
  }

  onSave() {
    this.save.emit({
      id: this.info?.id || null,
      type: this.form.get('type').value,
      label: this.form.get('label').value,
      value: this.form.get('value').value
    });
  }

  onRemove() {
    this.remove.emit(
      this.info.id
    );
  }

}
