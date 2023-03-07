import { ToxicologicalSample } from '../entities/toxicological-sample.entity';

export class PassingScoreModel {
  toxicologicalSample: ToxicologicalSample;
  cocaine: boolean;
  amphetamine: boolean;
  methamphetamine: boolean;
  mda: boolean;
  mdma: boolean;
  thc: boolean;
  morphine: boolean;
  codeine: boolean;
  heroin: boolean;

  private passingScoreValues = {
    cocaine: 0.5,
    amphetamine: 0.2,
    methamphetamine: 0.2,
    mda: 0.2,
    mdma: 0.2,
    thc: 0.05,
    morphine: 0.2,
    codeine: 0.2,
    heroin: 0.2,
    benzoylecgonine: 0.05,
    cocaethylene: 0.05,
    norcocaine: 0.05,
  };

  constructor({
    toxicologicalSample,
    cocaine,
    amphetamine,
    methamphetamine,
    mda,
    mdma,
    thc,
    morphine,
    codeine,
    heroin,
    benzoylecgonine,
    cocaethylene,
    norcocaine,
  }) {
    this.toxicologicalSample = toxicologicalSample;
    this.cocaine =
      cocaine >= this.passingScoreValues.cocaine &&
      (benzoylecgonine >= this.passingScoreValues.benzoylecgonine ||
        cocaethylene >= this.passingScoreValues.cocaethylene ||
        norcocaine >= this.passingScoreValues.norcocaine);
    this.amphetamine = amphetamine >= this.passingScoreValues.amphetamine;
    this.methamphetamine =
      methamphetamine >= this.passingScoreValues.methamphetamine;
    this.mda = mda >= this.passingScoreValues.mda;
    this.mdma = mdma >= this.passingScoreValues.mdma;
    this.thc = thc >= this.passingScoreValues.thc;
    this.morphine = morphine >= this.passingScoreValues.morphine;
    this.codeine = codeine >= this.passingScoreValues.codeine;
    this.heroin = heroin >= this.passingScoreValues.heroin;
  }
}
