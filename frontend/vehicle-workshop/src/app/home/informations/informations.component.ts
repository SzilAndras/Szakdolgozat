import {Component, OnInit} from '@angular/core';
import {InfoInterface} from "../../shared/model/interfaces/info.interface";
import {HomeHttpService} from "../../shared/service/http/home-http.service";
import {InfoTypeEnum} from "../../shared/model/enums/info-type.enum";
import {UserService} from "../../shared/service/user.service";

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {
  ADDRESS = InfoTypeEnum.ADDRESS;
  EMAIL = InfoTypeEnum.EMAIL;
  PHONE = InfoTypeEnum.PHONE;
  OTHER = InfoTypeEnum.OTHER;


  infos: InfoInterface[] = [];
  newInfo: InfoInterface = {id: undefined, label: '', type: '', value: ''};
  isSelectable: boolean;
  selectedId: number;
  new: boolean;

  types = [
    {type: InfoTypeEnum.ADDRESS, label: 'Cím'},
    {type: InfoTypeEnum.EMAIL, label: 'Email'},
    {type: InfoTypeEnum.PHONE, label: 'Telefon'},
    {type: InfoTypeEnum.OTHER, label: 'Egyéb'}

  ];

  constructor(private service: HomeHttpService, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshInfos();
    this.selectable();
  }

  refreshInfos() {
    this.service.getInfos().subscribe(
      res => {
        this.infos = res;
      }
    );
  }

  onSave(info: InfoInterface) {
    this.service.saveInfo(info).subscribe(
      () => {
        this.selectedId = null;
        this.new = false;
        this.refreshInfos()
      }
    )
  }

  onRemove(id: number) {
    this.service.removeInfo(id).subscribe(
      () => {
        this.refreshInfos()
      }
    )
  }


  onInfoSelect(id: number) {
    if ( this.selectedId !== id) {
      this.selectedId = id;
      this.new = false;
    }
  }

  selectable() {
    this.userService.role.subscribe(
      role => {
        this.isSelectable = role === 'ADMIN';
      }
    );
  }

  openNew() {
    this.new = !this.new;
    this.selectedId = null;
  }


  getByType(type: InfoTypeEnum) {
    return this.infos.filter(info => info.type === type);
  }

}
