const app = Vue.createApp({

    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner : null,
            logMessages : []

        }
    },

    watch: {
            playerHealth(value){
                if (value<= 0 && this.monsterHealth <= 0){
                    // this is a draw
                    this.winner = "draw"
                }
                else if (value <= 0){
                        //player lost
                        this.winner = "monster"
                }
            },

            monsterHealth(value){
                    if (value <= 0 && this.playerHealth <=0){
                        // player wins
                        this.winner = "draw"
                    }
                    else if (value <= 0){
                        //monster lost
                        this.winner = "player"
                    }
            }
    },

    computed: {
        monsterBarStyle(){
            if (this.monsterHealth <= 0){
                return {
                    width: "0%"
                }
            }
            return{
                width: this.monsterHealth + '%'
            }
        },

        playerBarStyle(){
            if (this.playerHealth <= 0 ){
                return{
                    width: "0%"
                }
            }
            return {
                width: this.playerHealth + '%'
            }
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        }
        

    },

    methods: {
        startGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.currentRound = 0
            this.logMessages= []

        },
        attackMonster(){
            this.currentRound++
            console.log(this.currentRound)
        const attackValue =  Math.floor(Math.random()* (12-5)+4) 
        console.log("DEY PLAY ")
            this.monsterHealth = this.monsterHealth - attackValue; 
            this.addLogMessages("player", "attack", attackValue)
            this.attackPlayer();
        },
         attackPlayer(){ 
       const attackValue = Math.floor(Math.random()* (10-4)+4)
       this.playerHealth -= attackValue;
       this.addLogMessages("monster", "attack", attackValue)
         },

         specialAttackMonster(){
            this.currentRound++
            console.log(this.currentRound)
            const attackValue = Math.floor((Math.random()* (25-10)+10));
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessages("player", "special-attack", attackValue)
            this.attackPlayer();
         },

         healPlayer(){
            this.currentRound++
            const healValue = Math.floor(Math.random()*(20-8))
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }
            else{
               this.playerHealth = this.playerHealth + healValue;
               this.addLogMessages("player", "heal", healValue)
            }
            this.attackPlayer
         },

         surrender(){
            this.winner = "monster"
            console.log("i tire")

         },

         addLogMessages(who, what, value){
            this.logMessages.unshift({
                actionby: who,
                actionType: what,
                actionValue: value
                
            });
         }
    }

    

});



app.mount("#game");