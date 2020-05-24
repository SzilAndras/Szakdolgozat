import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsInterface} from "../../../shared/model/interfaces/news.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  form: FormGroup;


  @Input() news: NewsInterface;

  @Input() editable: boolean;
  @Input() selectable: boolean;

  @Output() selected: EventEmitter<NewsInterface> = new EventEmitter();
  @Output() save: EventEmitter<NewsInterface> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: this.news?.title || null,
      text: this.news?.text || '',
      tags: this.news?.tags ||''
    })
  }

  onSelect() {
    if (this.selectable) {
      this.selected.emit(this.news);
    }
  }

  onCancel() {
    this.cancel.emit();
  }


  onSave() {
    this.save.emit({
      id: this.news?.id || null,
      title: this.form.get('title').value,
      text: this.form.get('text').value,
      tags: this.form.get('tags').value
    });
  }

  onRemove() {
    this.remove.emit(
      this.news.id
    );
  }

}
