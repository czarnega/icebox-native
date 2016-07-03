import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TabBarIOS
} from 'react-native';
// import Icebox from './icebox';
// import Recipes from './recipes';
import * as actions from '../actions';
import { Actions } from "react-native-router-flux";
import RecipeList from '../containers/recipeList';
import RecipeSuggestionList from '../containers/recipeSuggestionList';
import Icebox from './icebox';
import FoodInput from '../containers/foodInput';
// import Settings from '../containers/settings';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      suggestionsReceived: false,
      recipesReceived: false,
      selectedTab: 'icebox',
    };
    this.routeToInput = this.routeToInput.bind(this);
  }
	componentDidMount() {
		if(this.props.suggestions.length === 0){
      console.log('suggestions in dashboard empty')
      this.props.getRecipeSuggestions();
    }
    if(this.props.recipes.length === 0){
      console.log('recipes in dashboard empty')
      this.props.getRecipes();
    }
	}

	routeToInput(){
		this.setState({
			selectedTab: 'input'
		})
	}

  render() {
    return (
    	<View style={styles.container}>
    		<View style={styles.header}>
    			<View style={styles.headerLeft}>
    			</View>
    			<View style={styles.headerMiddle}>
    				<Text style={styles.title}>
    					Icebox
    				</Text>
    			</View>
    			<View style={styles.headerRight}>
    				<TouchableHighlight
    					onPress={()=>this.props.signoutUser()}
    					style={styles.logoutButton}
    					underlayColor={'white'}
    				>
    					<Text style={styles.logout}>
    						Logout
    					</Text>
    				</TouchableHighlight>
    			</View>
    		</View>
    		<View style={styles.body}>
		      <TabBarIOS
		        unselectedTintColor="grey"
		        tintColor="black"
		        barTintColor="white"
		       >
		        <TabBarIOS.Item
		          title="Icebox"
		          icon={require('../../assets/icebox-outline.png')}
		          selected={this.state.selectedTab === 'icebox'}
		          onPress={() => {
		            this.setState({
		              selectedTab: 'icebox',
		            });
		          }}>
		          <Icebox routeToInput={this.routeToInput}/>
		        </TabBarIOS.Item>
		        <TabBarIOS.Item
		          title="Suggestions"
		          icon={require('../../assets/suggestions-outline.png')}
		          selected={this.state.selectedTab === 'suggestions'}
		          onPress={() => {
		            this.setState({
		              selectedTab: 'suggestions',
		            });
		          }}>
		          <RecipeSuggestionList />
		        </TabBarIOS.Item>
		        <TabBarIOS.Item
		          title="Input"
		          icon={require('../../assets/input-outline.png')}
		          selected={this.state.selectedTab === 'input'}
		          onPress={() => {
		            this.setState({
		              selectedTab: 'input',
		            });
		          }}>
		          <FoodInput />
		        </TabBarIOS.Item>
		        <TabBarIOS.Item
		          title="Recipes"
		          icon={require('../../assets/recipes-outline.png')}
		          selected={this.state.selectedTab === 'pastRecipes'}
		          onPress={() => {
		            this.setState({
		              selectedTab: 'pastRecipes',
		            });
		          }}>
		          <RecipeList />
		        </TabBarIOS.Item>
		        <TabBarIOS.Item
		          title="Profile"
		          icon={require('../../assets/settings-outline.png')}
		          selected={this.state.selectedTab === 'settings'}
		          onPress={() => {
		            this.setState({
		              selectedTab: 'settings',
		            });
		          }}>
		          <RecipeSuggestionList />
		        </TabBarIOS.Item>
		      </TabBarIOS>
		    </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  header: {
  	height: 56,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  headerLeft: {
  	width: 90,
  },
  headerMiddle: {
  	flex: 1,
  },
  headerRight: {
  	width: 90,
  	height: 56,
  	flexDirection: 'row',
  	justifyContent: 'flex-end',
  	alignItems: 'center',
  	paddingRight: 12,
  },
  logoutButton: {
  	width: 60,
  	height: 40,
  	borderRadius: 5,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  logout: {
  	fontSize: 16,
  },
  title: {
  	fontFamily: 'SnellRoundhand-Black',
  	// fontWeight: 'bold',
  	alignSelf: 'center',
  	fontSize: 44,
  },
  body: {
  	flex: 1,
  },
  icon: {

  },
  cameraButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#A53934',
    flex: 1
  },
  iceboxButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#EEB87C',
    flex: 1
  },
  recipesButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#A1B38E',
    flex: 1
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  }
});

const mapStateToProps = state => ({
  user: state.user,
  suggestions: state.recipes.suggestions,
  recipes: state.recipes.pastSuggestions,
  chosenRecipe: state.recipes.chosenRecipe,
});

export default connect(mapStateToProps, actions)(Dashboard);

// <View style={styles.container}>
//   <TouchableHighlight
//       style={styles.cameraButton}
//       onPress={Actions.scanner}
//       underlayColor="#88D4F5">
//         <Text style={styles.buttonText}>My Camera</Text>
//   </TouchableHighlight>
//   <TouchableHighlight
//       style={styles.iceboxButton}
//       onPress={Actions.icebox}
//       underlayColor="#88D4F5">
//         <Text style={styles.buttonText}>My Icebox</Text>
//   </TouchableHighlight>
//   <TouchableHighlight
//       style={styles.recipesButton}
//       onPress={Actions.recipes}
//       underlayColor="#E39EBF">
//         <Text style={styles.buttonText}>My Recipes</Text>
//   </TouchableHighlight>
// </View>


