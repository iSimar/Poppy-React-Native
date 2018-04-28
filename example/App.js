import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import Poppy from 'poppy-react-native';
export default class App extends React.Component {

  state = {
    listData: [
      {
        id: '0',
        title: 'Get groceries',
        image: 'https://media.gettyimages.com/photos/produce-and-bulk-food-on-display-in-health-food-grocery-store-market-picture-id750415109'
      },
      {
        id: '1',
        title: 'Take dog for a walk',
        image: 'https://media.gettyimages.com/photos/young-woman-going-walkies-with-her-dog-picture-id691046197'
      },
      {
        id: '2',
        title: 'Finish school homework',
        image: 'https://media.gettyimages.com/photos/setting-the-page-on-fire-with-some-hard-work-picture-id492198113'
      },
      {
        id: '3',
        title: 'Create react native app',
        image: 'https://media.gettyimages.com/photos/closeup-of-javascript-on-computer-monitor-picture-id660582997'
      }
    ]
  }

  renderItem({item}) {
    return(
      <Poppy key={item.id}>
        <View style={styles.card}>
          <ImageBackground style={styles.cardBackgroundImage} 
                           source={{uri: item.image}}>
            <View style={styles.cardBackgroundImageContent}>
              <Text style={styles.cardTitleText}>{item.title}</Text>
            </View>
          </ImageBackground>
        </View>
      </Poppy>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reminders</Text>
        </View>
        <View style={styles.content}>
          <FlatList data={this.state.listData} 
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#ff4757',
    paddingTop: 60,
    paddingBottom: 30,
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  card: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
  cardBackgroundImage: {
    flex: 1,
  },
  cardBackgroundImageContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardTitleText: {
    flex: 1,
    fontSize: 25, 
    color: '#fff',
  }
});
