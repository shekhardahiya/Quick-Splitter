import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  @ViewChild('tname') transactionNameField;
  transactionForm: FormGroup;
  groupId;
  start = false;
  groupMember = [];
  allTransactions;
  userPartOfTransactions = [];
  totalOfAllTransactions = { amount: 0 };
  totalOfPartOfTransactions = { amount: 0 };
  transactionInModal;
  loggedInUser;
  groupMemberForCheckbox;
  showSuccess = false;
  inviteSend = false;
  registered = false;
  transactionSettled = false;
  constructor(
    private api: DataProviderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
    });
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));

    this.getGroupData();
    this.initiateTransactionForm();
    this.getAllTransactions();
    // this.partOfTransactions();
  }
  /**
   * This method will initiate the transaction form
   */
  initiateTransactionForm() {
    this.transactionForm = this.formBuilder.group({
      transactionName: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      membersOfTransaction: new FormArray([], this.minSelectedCheckboxes(1)),
      upiId: [''],
    });
    this.start = true;
  }
  get membersOfTransactionFormArray() {
    return this.transactionForm.controls.membersOfTransaction as FormArray;
  }
  /**
   * This method will fetch all transactions based on the group Id
   */
  getAllTransactions() {
    this.api.getAlltransactions(this.groupId).subscribe((data) => {
      this.allTransactions = data['data'].reverse();

      this.totalOfAllTransactions = this.allTransactions?.reduce(
        (previousValue, currentValue) => ({
          amount: previousValue.amount + currentValue.amount,
        }),
        { amount: 0 }
      );
      this.partOfTransactions();
    });
  }
  /**
   * This method will add new Transaction to a group
   */
  addNewTransaction() {
    const transactionMembers = this.transactionForm.value.membersOfTransaction
      .map((checked, i) => (checked ? this.groupMemberForCheckbox[i] : null))
      .filter((v) => v !== null);

    const transactionMembersWithinitiator = [
      ...transactionMembers,

      {
        memberName: this.loggedInUser.userName,
        userEmailId: this.loggedInUser.userEmailId,
        paid: false,
      },
    ];

    let user = JSON.parse(localStorage.getItem('user'));
    const payloadForCreateTransaction = {
      groupId: this.groupId,
      transactionName: this.transactionForm.controls.transactionName.value,
      initiatedBy: {
        memberName: user.userName,
        userEmailId: user.userEmailId,
      },
      amount: this.transactionForm.controls.amount.value,
      membersOfTransaction: transactionMembersWithinitiator,
      upiId: this.transactionForm.controls?.upiId.value,
    };

    this.api
      .createTransaction(payloadForCreateTransaction)
      .subscribe((data) => {});
    setTimeout(() => {
      this.getAllTransactions();
    }, 1000);
    this.transactionForm.reset();
    this.showSuccess = true;
  }
  /**
   * This method will fetch the group details
   */
  getGroupData() {
    this.api.getGroup(this.groupId).subscribe((data) => {
      const groupmemberwithpaidflag = data['data'][0]?.members;
      data['data'][0]?.members.forEach((member) => {
        member.paid = false;
      });

      this.groupMember = groupmemberwithpaidflag;
      this.groupMemberForCheckbox = this.groupMember.filter((ele) => {
        return ele.userEmailId != this.loggedInUser.userEmailId;
      });
      this.addCheckboxes();
    });
  }
  /**
   * This method will add checkbox in transaction form
   */
  private addCheckboxes() {
    this.groupMemberForCheckbox?.forEach((member) => {
      this.membersOfTransactionFormArray.push(new FormControl(false));
    });
  }
  /**
   * This method fetches the users transactions
   */
  partOfTransactions() {
    this.userPartOfTransactions = [];
    let user = JSON.parse(localStorage.getItem('user'));
    this.allTransactions?.forEach((ele) => {
      ele['membersOfTransaction'].forEach((ele2) => {
        if (ele2?.['userEmailId'] == user.userEmailId) {
          if (!this.userPartOfTransactions.includes(ele)) {
            this.userPartOfTransactions.push(ele);
          }
        }
      });
    });

    this.totalOfPartOfTransactions = this.userPartOfTransactions?.reduce(
      (previousValue, currentValue) => ({
        amount: previousValue.amount + currentValue.amount,
      }),
      { amount: 0 }
    );
    setTimeout(() => {
      this.showSuccess = false;
    }, 1000);
  }
  /**
   * This method validates the minimum member selection for a expense.
   * @param min
   * @returns
   */
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
  get form() {
    return this.transactionForm.controls;
  }
  /**
   * This method assigns transaction to modal when user clicks on settle button
   * @param selectedTransaction
   */
  assigntransactionToModal(selectedTransaction) {
    let count = 1;
    this.transactionSettled = false;
    this.transactionInModal = selectedTransaction;
    if (
      this.transactionInModal.initiatedBy.userEmailId ==
      this.loggedInUser.userEmailId
    ) {
      this.transactionInModal.membersOfTransaction.forEach((ele) => {
        if (ele?.paid) {
          count++;
        }
      });
      if (count == this.transactionInModal.membersOfTransaction.length) {
        this.transactionSettled = true;
      }
    }
  }
  focusOnTransactionName() {
    this.transactionNameField.nativeElement.focus();
  }
  scroll(el: HTMLElement) {
    console.log(el);
    el.scrollIntoView({ behavior: 'smooth' });
  }
  /**
   * This method will send email invites
   * @param user
   */
  sendInviteMail(user) {
    this.inviteSend = false;
    this.registered = false;
    const payload = { userEmailId: user.userEmailId };
    this.api.sendInviteMail(payload).subscribe(
      (data) => {
        console.log(data);
        this.inviteSend = true;
      },
      (error) => {
        console.log(error);
        this.registered = true;
      }
    );
  }
}
