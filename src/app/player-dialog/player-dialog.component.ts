import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Countries, SquadNumber, Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  @Input() player: Player;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team;
  public countries = Object.keys(Countries).map((key) => ({
    label: key,
    key: Countries[key],
  }));
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: SquadNumber[key],
    }));
  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFromValue) {
    const key = this.playerService.addPlayer(playerFromValue).key;
    const playerFromValueKey = {
      ...playerFromValue,
      key,
    };
    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFromValueKey,
      ],
    };
    this.teamService.editTeam(formattedTeam);
  }

  private editPlayer(playerFromValue) {
    const playerFromWithValueKey = {
      ...playerFromValue,
      $key: this.player.$key,
    };
    const playerFromValueWithFormattedKey = {
      ...playerFromValue,
      key: this.player.$key,
    };
    delete playerFromValueWithFormattedKey.$key;
    const moddifiedPlayers = this.team.players
      ? this.team.players.map((player) => {
          return player.key === this.player.$key
            ? playerFromValueWithFormattedKey
            : player;
        })
      : this.team.players;

    const formattedTeam = {
      ...this.team,
      players: [
        ...(moddifiedPlayers
          ? moddifiedPlayers
          : [playerFromValueWithFormattedKey]),
      ],
    };
    this.playerService.editPlayer(playerFromWithValueKey);
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm): void {
    const playerFromValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFromValue.leftFooted =
        playerFromValue.leftFooted === '' ? false : playerFromValue.leftFoted;
    }
    if (this.player) {
      this.editPlayer(playerFromValue);
    } else {
      this.newPlayer(playerFromValue);
    }
    window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
