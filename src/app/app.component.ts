import { Component, OnInit } from '@angular/core';
import { client } from './dialog-flow-client/dialog-flow.client';
import { IMessage } from './models/message';
import { HttpClient } from '@angular/common/http';
import { MovieService } from './movie.service';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	conversation: IMessage[] = [];

  constructor(private movieService: MovieService){
  }


    ngOnInit(): void {
    console.log("blablabalbal");
  }

  
}
