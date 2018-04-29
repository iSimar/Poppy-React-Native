import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import { PoppyContainer, Poppy } from 'poppy-react-native';
export default class App extends React.Component {

  state = {
    loading: true,
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

  componentDidMount(){
    this.setState({
      loading: false,
    });
  }

  renderItem({item}) {
    return(
      <Poppy key={item.id} 
             rootRef={this.root} 
             style={{ marginTop: 30 }}
             headerStyle={{ paddingTop: 30, 
                            paddingBottom: 20, 
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.35)' }}
             headerStyleTransition={{ 
              paddingTop: 60,
              paddingLeft: 20,
              paddingBottom: 30,
             }}
             headerImage={{uri: item.image}}
             headerImageStyle={{ borderRadius: 8 }}>
          <Text style={styles.cardTitleText}>{item.title}</Text>
      </Poppy>
    );
  }

  render() {
    return (
      <PoppyContainer ref={c => this.root = c} 
                      style={styles.container}
                      animation='spring'
                      animationDuration={300}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Reminders</Text>
        </View>
        <View style={styles.content}>
          {
            !this.state.loading ?
            <FlatList data={this.state.listData} 
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem.bind(this)} />
            : null
          }
        </View>
      </PoppyContainer>
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
  cardTitleText: {
    flex: 1,
    fontSize: 30, 
    color: '#fff',
  }
});
