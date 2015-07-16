import fs from 'fs';
import path from 'path';
import sassVariables from '../../src';
import expect from 'expect';

describe('sass-variables loader', () => {
  it('should work', () => {

    const sass = fs.readFileSync(path.resolve(__dirname, '../variables.scss'), 'utf8');

    const parsed = JSON.parse(
      sassVariables(sass).replace(/module\.exports = ([^;]+);/, (_, m) => m)
    );

    expect(parsed).toEqual({
      aquamarine: "#45a7b9",
      borderColor: "$pearl",
      borderRadius: "5px",
      cobalt60: "rgba(0, 68, 162, 0.6)",
      green: "#299f51",
      lemon60: "rgba(255, 233, 15, 0.6)",
      lynch: "#628292",
      paddingLarge: "15px",
      paddingSmall: "7px",
      pearl: "#e6e6e6",
      perano: "#bfe0f6",
      silver: "#bdc2ca",
      snow: "#f5f7fa",
      tangerine60: "rgba(255, 141, 15, 0.6)",
      vermillion60: "rgba(251, 25, 25, 0.6)"
    });

  });
});
