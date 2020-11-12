import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../enums/Manufacturer';
import { Augment } from '../interfaces/models/Augment';
import { Car } from '../interfaces/models/Car';
import { Resource } from '../interfaces/models/Resource';
import { PortalSync } from '../interfaces/responses/PortalSync';
import { StaticData } from '../interfaces/responses/StaticData';
import { PortalSyncService } from '../services/portal-sync.service';
import { StaticDataService } from '../services/static-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public staticData: StaticData;
  public portalSync: PortalSync;
  public carsMap: Map<string, Car> = new Map<string, Car>();
  public resourceMap: Map<string, Resource> = new Map<string, Resource>();
  public augmentMap: Map<string, Augment> = new Map<string, Augment>();
  public ftueConfig: any = null;
  public orderedFTUEConfig: any = null;
  public carManufacturerEnumMap: any;

  constructor(public portalSyncService: PortalSyncService, public staticDataService: StaticDataService) { }

  ngOnInit(): void {
    this.staticDataService.getStaticData('placeholder', 'placeholder', 'placeholder').subscribe(staticDataResponse => {
      this.staticData = staticDataResponse;
      // Additional cars map is needed to get static car data by carId as user cars doesn't contain all the required visual properties (e.g car model)
      for (let i = 0; i < this.staticData.cars.length; i++) {
        this.carsMap.set(this.staticData.cars[i].carId, this.staticData.cars[i]);
      }

      for (let i = 0; i < this.staticData.resources.length; i++) {
        this.resourceMap.set(this.staticData.resources[i].resourceId, this.staticData.resources[i]);
      }

      for (let i = 0; i < this.staticData.augments.length; i++) {
        this.augmentMap.set(this.staticData.augments[i].augmentId, this.staticData.augments[i]);
      }

      this.ftueConfig = this.staticData.ftueConfig;
      this.orderedFTUEConfig = {};
      Object.keys(this.ftueConfig).forEach((ftueVersion) => {
        if (!this.orderedFTUEConfig.hasOwnProperty(ftueVersion)) {
          this.orderedFTUEConfig[ftueVersion] = {};
        }

        Object.keys(this.ftueConfig[ftueVersion]).forEach((ftueStory) => {
          const ftueSteps = Object.keys(this.ftueConfig[ftueVersion][ftueStory]);
          const orderedFTUESteps = []; // new Array(ftueSteps.length);
          for (let i = 0; i < ftueSteps.length; i++) {
            for (let j = 0; j < ftueSteps.length; j++) {
              if (this.ftueConfig[ftueVersion][ftueStory][ftueSteps[j]] === i) {
                orderedFTUESteps.push(ftueSteps[j]);
                break;
              }
            }
          }

          this.orderedFTUEConfig[ftueVersion][ftueStory] = orderedFTUESteps;
        });
      });

      this.carManufacturerEnumMap = {};
      Object.keys(Manufacturer).forEach((manufacturer) => {
        this.carManufacturerEnumMap[Manufacturer[manufacturer]] = manufacturer;
      });

      this.portalSyncService.getPortalSync('placeholder', 'placeholder', 'placeholder').subscribe(portalSyncResponse => {
        this.portalSync = portalSyncResponse;
      });
    });
  }

}
