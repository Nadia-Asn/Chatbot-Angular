import { IButton } from "selenium-webdriver";

export interface IMessage {
    avatar: string;
    from: string;
    content: string;
    button: Array<String>
}