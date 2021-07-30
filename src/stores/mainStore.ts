import { makeObservable, observable, action, computed, configure } from "mobx";

configure({
    useProxies: "always",
    enforceActions: "always",
});

export class MainStore {
    // test: ITest;

    constructor() {
        makeObservable<MainStore>(this, {
            // test: observable.ref,
        })
    }

    get info() {
        return {
            // test: this.test,
        }
    }

}