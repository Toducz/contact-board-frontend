import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';


@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'] 
})
export class HomeComponent {

    textArea: string = '';
    description: string = "";
    isEmojiPickerVisible?: boolean;

    fetchData = [
        {
            description: "magyar vagyok",
            ratingValue: "❤️❤️❤️❤️",
            isEmojiPickerVisible: false
        },
        {
            description: "roman vagyok",
            ratingValue: "❤️❤️❤️❤️",
            isEmojiPickerVisible: false
        },
        {
            description: "nemet vagyok",
            ratingValue: "❤️❤️❤️❤️",
            isEmojiPickerVisible: false
        }
    ]
    
    public addEmoji(event: any, isEmojiPickerVisible: boolean) {
        this.textArea = `${this.textArea}${event.emoji.native}`;
        isEmojiPickerVisible = false;
        console.log(this.textArea);
    }

    constructor(private userService: UserService) { }

    ngOnInit() {

    }
}