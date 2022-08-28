import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const [scoreless, setScoreless] = useState('');
  let [countX, setCountX] = useState(0);
  let [countO, setCountO] = useState(0);
  let [highlighted, setHighlighted] = useState('');




  const checkForWinner = (squares) => {

      let combos = {

          across: [
              ['0', '1', '2'],
              ['3', '4', '5'],
              ['6', '7', '8']
          ],

          down: [
              ['0', '3', '6'],
              ['1', '4', '7'],
              ['2', '5', '8']
          ],

          diagnol: [
              ['0', '4', '8'],
              ['2', '4', '6']
          ]
      };




      for (let combo in combos) {
          combos[combo].forEach((pattern) => {


              if (
                  squares[pattern[0]] === '' ||
                  squares[pattern[1]] === '' ||
                  squares[pattern[2]] === ''
              ) {


              }

              else if (
                  squares[pattern[0]] === squares[pattern[1]] &&
                  squares[pattern[1]] === squares[pattern[2]]
              ) {

                  setWinner(squares[pattern[0]]);

                  if (squares[pattern[0]] === 'X') {
                      setCountX(Number(countX) + 1);
                  } else {
                      setCountO(Number(countO) + 1)
                  };

                  setHighlighted(Cell({ pattern }));
              }




          }

          )
      };


      checkForScoreless(squares);

  };


  const handleClick = (num) => {
      let squares = [...cells];

      if (winner !== '') {

          return;

      } else {

          if (cells[num] !== "") {
              alert("This box has been used");
              return;
          }

          if (turn === 'X') {
              squares[num] = 'X';
              setTurn('O');
          } else if (turn === 'O') {
              squares[num] = 'O';
              setTurn('X');
          }

          setCells(squares);
          checkForWinner(squares);
          checkForScoreless(squares);

      }
  }

  const checkForScoreless = (e) => {
      if (e.indexOf('') === -1) {
          setScoreless('The game is scoreless');
          return;
      }

  }

  const handleRestart = () => {
      setWinner('');
      setCells(Array(9).fill(''));
      setTurn('X');
      setHighlighted('');
      setScoreless('');


  }


  const Cell = ({ num }) => {

      return <td

          style={{ backgroundColor: highlighted ? '#B91646' : '#105652' }}
          onClick={() => { handleClick(num) }}>
          {cells[num]}
      </td>

  }
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
