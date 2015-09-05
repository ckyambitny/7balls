class MealState {
    preload() {
        this.load.image('bg-meal-house', './assets/graphics/backgrounds/bg-meal-house.jpg');
    }

    create() {
        this.add.image(0, 0, 'bg-meal-house');
    }

    update() {

    }

    render() {

    }
}

export default MealState;