import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  transactionId;
  loggedInUser;
  transactionDetails;
  allComments;
  commentInput;
  constructor(
    private api: DataProviderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.transactionId = params['transactionId'];
    });
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));

    this.fetchTransactionDetails();
    this.fetchAllComments();
  }
  /**
   * This method fecthes all details of a transaction.
   */
  fetchTransactionDetails() {
    this.api.getSingleTransactions(this.transactionId).subscribe((data) => {
      this.transactionDetails = data['data'][0];
    });
  }
  /**
   * This method will fetch all comments of a transaction
   */
  fetchAllComments() {
    this.api.getAllComments(this.transactionId).subscribe((data) => {
      this.allComments = data['data'].reverse();
    });
  }
  /**
   * This method will create a new Comment for a transaction
   */
  createComment() {
    const comment = {
      transactionId: this.transactionId,
      comment: this.commentInput,
      commentedBy: {
        memberName: this.loggedInUser.userName,
        userEmailId: this.loggedInUser.userEmailId,
      },
    };
    this.commentInput = '';
    this.api.createComment(comment).subscribe((data) => {
      setTimeout(() => {
        this.fetchAllComments();
      }, 1000);
    });
  }
  /**
   * This method will update a existing transaction
   * @param memberId
   */
  updateTransaction(memberId) {
    let members = this.transactionDetails.membersOfTransaction;

    members.forEach((member) => {
      if (member.userEmailId == memberId) {
        member.paid = true;
      }
    });
    const payloadForTransactionUpdate = {
      transactionId: this.transactionId,
      membersOfTransaction: members,
    };
    this.api
      .updateTransaction(payloadForTransactionUpdate)
      .subscribe((data) => {});
  }
}
