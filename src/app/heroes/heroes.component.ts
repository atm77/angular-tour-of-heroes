import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero'
import { HEROES } from '../mock-heroes'
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  //heroes: Array<Hero> = HEROES;
  heroes: Hero[]; //simple declaration.

  getHeroes(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroesService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  onSelect(hero: Hero): void {
    this.messageService.add('Hero selected: ' + hero.name)
    this.selectedHero = hero;
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService.deleteHero(hero).subscribe();
  }

  constructor(private heroesService: HeroService, private messageService: MessageService) {
    
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
