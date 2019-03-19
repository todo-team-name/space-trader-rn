import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import SwitchSelector from "react-native-switch-selector";
import { SimpleStepper } from 'react-native-simple-stepper';

import Button from '../components/Button'


class SkillPicker extends Component { 
  state = {
    fighterSkill: 0,
    traderSkill: 0,
    engineerSkill: 0,
    pilotSkill: 0,
    difficulty: "normal"
  }

  MAX_VALUE = 16

  getRemainingPoints() {
    return this.MAX_VALUE - Object.keys(this.state).reduce((previous, key) => {
      return previous + (key == "difficulty" ? 0 : this.state[key]);
    }, 0)
  }

  render() {
    const remainingPoints = this.getRemainingPoints();
    const options = [
      { label: "Beginner", value: "beginner" },
      { label: "Easy", value: "easy" },
      { label: "Normal", value: "normal" },
      { label: "Hard", value: "hard" },
      { label: "Impossible", value: "impossible" },

    ];
    return (

        <View style={{
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'center', 
        }}>
        
          <SwitchSelector
            options={options}
            initial={2}
            onPress={value => this.setState({difficulty: value})}
          />

          <Text>remainingPoints: {remainingPoints}</Text>
          <Text>pilotSkill: {this.state.pilotSkill}</Text>
          <SimpleStepper value={this.state.pilotSkill} maximumValue={remainingPoints + this.state.pilotSkill} valueChanged={value => this.setState({pilotSkill: value})} />

          <Text>fighterSkill: {this.state.fighterSkill}</Text>
          <SimpleStepper value={this.state.fighterSkill} maximumValue={remainingPoints + this.state.fighterSkill} valueChanged={value => this.setState({fighterSkill: value})} />

          <Text>traderSkill: {this.state.traderSkill}</Text>
          <SimpleStepper value={this.state.traderSkill} maximumValue={remainingPoints + this.state.traderSkill} valueChanged={value => this.setState({traderSkill: value})} />

          <Text>engineerSkill: {this.state.engineerSkill}</Text>
          <SimpleStepper value={this.state.engineerSkill} maximumValue={remainingPoints + this.state.engineerSkill} valueChanged={value => this.setState({engineerSkill: value})} />
          <Button
            title='Sign Up'
            onPress={() => this.props.completeSkillPicking(this.state)}
          />
        </View>

    );
  }
}

export default SkillPicker