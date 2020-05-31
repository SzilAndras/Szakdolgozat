import {Component, OnInit} from '@angular/core';
import {NewsInterface} from "../../shared/model/interfaces/news.interface";
import {HomeHttpService} from "../../shared/service/http/home-http.service";
import {UserService} from "../../shared/service/user.service";
import {UserRoleEnum} from "../../shared/model/enums/user-role.enum";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: NewsInterface[] = [];
  selectedNews: NewsInterface;

  isEditable: boolean = false;
  isEdit: boolean = false;

  constructor(private homeService: HomeHttpService, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshNewsList();
    this.refreshEditable();
  }


  refreshNewsList() {
    this.homeService.getNews().subscribe(
      newsList => {
        this.isEdit = false;
        this.newsList = newsList;
      }
    )
  }

  refreshEditable() {
    this.userService.role.subscribe(
      role => {
        this.isEditable = role === UserRoleEnum.ADMIN;
      }
    );
  }

  onSave(news: NewsInterface) {
    this.homeService.saveNews(news).subscribe(
      () => {
        this.refreshNewsList();

      }
    )
  }

  onRemove(id: number) {
    this.homeService.removeNews(id).subscribe(
      () => {
        this.refreshNewsList()
      }
    )
  }

  onCancel() {
    this.isEdit = false;
    this.selectedNews = null;
  }

  onNewsSelect(news: NewsInterface) {
      this.selectedNews = news;
      this.isEdit = true;
  }


  openNew() {
    this.initNews();
    this.isEdit = true;
  }

  initNews() {
    this.selectedNews = {
      id: null,
      title: '',
      text: '',
      tags: '',
      authorName: null
    };
  }

}
