import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'team-generator';
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  onInput(member: string) {
    this.newMemberName = member;
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  addMember() {
    if (this.newMemberName == '') {
      this.errorMessage = "Name can't be empty!";
      return;
    }

    this.errorMessage = '';

    this.members.push(this.newMemberName);
    this.newMemberName = '';
    console.log(this.members);
  }

  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams';
      return;
    }

    if (this.members.length < this.numberOfTeams) {
      this.errorMessage = 'Not enough members';
      return;
    }

    this.errorMessage = '';

    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);

        const member = allMembers.splice(randomIndex, 1)[0];

        if (member == undefined) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    console.log(this.teams);
    this.members = [];
    this.numberOfTeams = '';
  }
}
