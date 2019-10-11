class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
            this.initial=config.initial;
            this.states=config.states;
            this.arr1=[];
            this.arr2=[];
            this.solve=false;
        }else{
            throw Err;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states[state]){
            this.arr1.push(this.initial);
            this.initial=state;
            this.solve=false;
        }else{
            throw err;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.states[this.initial].transitions[event]){
            this.changeState(this.states[this.initial].transitions[event]);
        }else{
            throw err;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.initial=this.arr1[0];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr=[], transition;
        if(event){
            for(let key1 in this.states){
                transition=this.states[key1].transitions;
                for(let key2 in transition){
                    if(key2===event){
                        arr.push(key1);
                    }
                }
            }
        }else{
            for(let key in this.states){
                arr.push(key);
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.arr1.length===0){
            return false;
        }else{
            this.arr2.push(this.initial);
            this.initial=this.arr1.pop();
            this.solve=true;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.arr2.length===0){
            return false;
        }else{
            this.initial=this.arr2.pop();
            this.arr1.push(this.initial);
            return this.solve;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arr1=[];
        this.arr2=[];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/