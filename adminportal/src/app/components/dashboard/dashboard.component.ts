import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  type = 'Hutch ID'; // This would be a string literal type
  query: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setSearchType(type: string) {
    this.type = type;
  }

  doSearch() {
    this.router.navigate(['/user']);
  }
}
