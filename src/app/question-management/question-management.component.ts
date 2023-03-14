import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionManagementService } from './question-management.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent {

  questions: QuestionModel[] = [];
  currentSearchParam = {
    currentPage: 1 as number,// mặc định phân trang 
    pageSize: 10 as number,// mặc định số lượng bản ghi 1 trang 
    numFound: null as number, // Số lượng bản ghi có trong db
  };
  selectGroup: any[]=[];
  groups=[
    {
      code:'P1'
    },
    {
      code:'P2'
    },
    {
      code:'P3'
    },
    {
      code:'P4'
    },
    {
      code:'P5'
    },
    {
      code:'P6'
    },
    {
      code:'P7'
    }
  ]
  settings = {
    singleSelection: false,
    idField: 'code',
    textField: 'code',
    enableCheckAll: true,
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    allowSearchFilter: true,
    maxHeight: 300,
    searchPlaceholderText: 'Tìm kiếm',
    noDataAvailablePlaceholderText: 'Không có dữ liệu',
    placeholder: false
  };
  @ViewChild("formFilter") formFilter: NgForm;
  constructor(
    private questionManagementService: QuestionManagementService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
  }
  ngOnInit(): void {
    this.onSearch(1, 10);
  }
  onSearch(currentPage: number, pageSize: number) {
    this.questionManagementService.searchUser(currentPage, pageSize, this.selectGroup).subscribe({
      next: data => {
        this.questions = data.details.records;
        this.currentSearchParam.numFound = data.details.totalRecords;
      }, error: err => {
        console.log(err);
      }
    })
  }

  openModalCreate(){
    
  }

  onChangePage(currentPage: number, pageSize: number) {
    this.currentSearchParam.currentPage = currentPage;
    this.onSearch(this.currentSearchParam?.currentPage, this.currentSearchParam?.pageSize);
  }
}
export class QuestionModel {
  id: number;
  type: string;
  detail: string;
  mediaPath: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  trueAnswer: string;
  part: string;
}
export class ResponseAPI<T> {
  code: number;
  success: boolean;
  details: {
    totalRecords: number;
    offset: number,
    limit: number,
    records: T
  }
  message: string;
  timestamp: number
}