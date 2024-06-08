import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';
import ListItem from './DeezerItem';
import { TouchableOpacity } from 'react-native';

export class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      searchQuery: '',
      loading: false,
    };

    this.layoutProvider = new LayoutProvider(
      () => 'audio',
      (type, dim) => {
        dim.width = Dimensions.get('window').width;
        dim.height = 60;
      }
    );
  }

  rowRenderer = (type, item) => {
    return(
    <TouchableOpacity onPress={() => this.props.onTrackSelect(item)}>
    <ListItem
    title={item.title}
    duration={item.duration}
    artist={item.artist.name} // Assuming artist details are nested
    imageUrl={item.album.cover_medium} // Assuming you have album art URLs
  /></TouchableOpacity>
)
  }

  handleSearch = async () => {
    if (this.state.searchQuery.trim() === '') {
      return;
    }
    this.setState({ loading: true });
    try {
      const response = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(this.state.searchQuery)}`);
      const json = await response.json();
      this.setState({
        dataProvider: this.state.dataProvider.cloneWithRows(json.data),
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tracks"
          value={this.state.searchQuery}
          onChangeText={text => this.setState({ searchQuery: text })}
          onSubmitEditing={this.handleSearch}
        />
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <RecyclerListView
            dataProvider={this.state.dataProvider}
            layoutProvider={this.layoutProvider}
            rowRenderer={this.rowRenderer}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    margin: 10,
  },
});

export default List;
