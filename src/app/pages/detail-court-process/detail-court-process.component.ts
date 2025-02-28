import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-court-process',
  imports: [],
  templateUrl: './detail-court-process.component.html',
  styleUrl: './detail-court-process.component.css'
})
export class DetailCourtProcessComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute){}

  courtProcessId: string | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courtProcessId = params.get('id')!;
      console.log(this.courtProcessId);
    });
  }
}
