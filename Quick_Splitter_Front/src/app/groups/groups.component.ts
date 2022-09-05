import { Component, HostListener, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  createGroupForm!: FormGroup;
  allGroups;
  partOfGroups = [];
  groupCreated = false;
  loggedInUser;
  constructor(
    private api: DataProviderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchallGroups();
    this.toInitializeCreateGroupForm();
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    // this.api.sendUserData(this.loggedInUser?.userName);
  }
  @HostListener('hide.bs.modal', ['$event']) onModalHide(event) {
    this.groupCreated = false;
    this.toInitializeCreateGroupForm();
  }
  /**
   * This method will initialize the form for Creating groups
   */
  toInitializeCreateGroupForm() {
    this.createGroupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      members: this.formBuilder.array([this.addMemberFormGroup()]),
    });
  }
  /**
   * This method will add member form group to create group form
   */
  addMemberFormGroup() {
    return this.formBuilder.group({
      memberName: ['', Validators.required],
      userEmailId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  /**
   * This method handles button click event of adding member
   */
  addMemberButtonClick(): void {
    (<FormArray>this.createGroupForm.get('members')).push(
      this.addMemberFormGroup()
    );
  }
  getMembersFormControl(): AbstractControl[] {
    return (<FormArray>this.createGroupForm.get('members')).controls;
  }
  pointAt(index) {
    return (<FormArray>this.createGroupForm.get('members')).at(index);
  }
  /**
   * Thie method is used to remove member from group form
   * @param index
   */
  removemember(index) {
    (this.createGroupForm.get('members') as FormArray).removeAt(index);
  }
  /**
   * This method fetches all groups
   */
  fetchallGroups() {
    let data = this.api.getAllGroups().subscribe((data) => {
      this.allGroups = data['data'].reverse();
      this.partOfGroup();
    });
  }
  /**
   * This method is used to create a new Group
   */
  createGroup() {
    let user = JSON.parse(localStorage.getItem('user'));

    let obj = [{ memberName: user.userName, userEmailId: user.userEmailId }];

    this.createGroupForm.value.members = [
      ...this.createGroupForm.value.members,
      ...obj,
    ];
    this.api.createNewGroup(this.createGroupForm.value).subscribe((data) => {
      this.createGroupForm.reset();
      setTimeout(() => {
        this.fetchallGroups();
      }, 1000);

      this.groupCreated = true;

      let updateUser = {
        userName: user.userName,
        userEmailId: user.userEmailId,
        groupsInvolved: [...user.groupsInvolved, data['groupId']],
      };
      localStorage.setItem('user', JSON.stringify(updateUser));
      this.api.updateUser(updateUser).subscribe((data) => {});
    });
  }
  /**
   * This method filters the group for logged in User
   */
  partOfGroup() {
    this.partOfGroups = [];
    let user = JSON.parse(localStorage.getItem('user'));
    this.allGroups?.forEach((ele) => {
      ele['members'].forEach((ele2) => {
        if (ele2['userEmailId'] == user.userEmailId) {
          if (!this.partOfGroups.includes(ele)) {
            this.partOfGroups.push(ele);
          }
        }
      });
    });
  }
}
