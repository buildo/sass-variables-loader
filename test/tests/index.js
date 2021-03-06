import sassVariables from '../../src';
import expect from 'expect';

describe('sass-variables loader', () => {
  it('should work', () => {

    const sass = `
  $silver: #bdc2ca;
    $charcoal: #2c3a40
  $pearl: #e6e6e6;
  $gray: #dfdfdf;
  $aquamarine: #45a7b9;
  $shakespeare: #4dbfd3;
  $green: #299f51;
  $cello: #23448a
  $lynch: #628292;${'   '}
  $fiord: #384952;
  $snow: #f5f7fa;
  $ice: #edf8ff;
  $perano: #bfe0f6;
  $tangerine: #ff8d0f;
  $tangerine60: rgba(255, 141, 15, 0.6);
  $lemon: #ffea0f;
  $lemon60: rgba(255, 233, 15, 0.6);
  $vermillion: #fb1919;
  $vermillion60: rgba(251, 25, 25, 0.6);
  $cobalt: #0044a2;
  $cobalt60: rgba(0, 68, 162, 0.6);

  $border-color: $pearl;

  $padding-small: 7px;
  $padding-medium: 10px;
  $padding-large: 15px;

  $border-radius: 5px;
  $border-radius-small: 2px;
`;

    const parsed = JSON.parse(
      sassVariables(sass).replace(/module\.exports = ([^;]+);/, (_, m) => m)
    );

    expect(parsed).toEqual({
      aquamarine: '#45a7b9',
      borderColor: '#e6e6e6',
      borderRadius: '5px',
      borderRadiusSmall: '2px',
      cello: '#23448a',
      charcoal: '#2c3a40',
      cobalt: '#0044a2',
      cobalt60: 'rgba(0, 68, 162, 0.6)',
      fiord: '#384952',
      gray: '#dfdfdf',
      green: '#299f51',
      ice: '#edf8ff',
      lemon: '#ffea0f',
      lemon60: 'rgba(255, 233, 15, 0.6)',
      lynch: '#628292',
      paddingLarge: '15px',
      paddingMedium: '10px',
      paddingSmall: '7px',
      pearl: '#e6e6e6',
      perano: '#bfe0f6',
      shakespeare: '#4dbfd3',
      silver: '#bdc2ca',
      snow: '#f5f7fa',
      tangerine: '#ff8d0f',
      tangerine60: 'rgba(255, 141, 15, 0.6)',
      vermillion: '#fb1919',
      vermillion60: 'rgba(251, 25, 25, 0.6)'
    });

  });

  it('should not skip lines', () => {
    const sass = `$loaded1: 100px;

$loaded2: 100px;
$ignored: 111px;
$loaded3: 100px;
`;
    const parsed = JSON.parse(
      sassVariables(sass).replace(/module\.exports = ([^;]+);/, (_, m) => m)
    );

    expect(parsed).toEqual({
      loaded1: '100px',
      loaded2: '100px',
      ignored: '111px',
      loaded3: '100px'
    });
  });
});
