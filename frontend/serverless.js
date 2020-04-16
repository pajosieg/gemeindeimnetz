const { Component } = require('@serverless/core');

const settings = {
  code: {
    src: 'build',
    hook: 'npm run build',
  },
};
settings;
class Frontend extends Component {
  async default(inputs) {
    this.context.status('Deploying');

    const frontendInputs = { ...inputs, ...settings };

    const website = await this.load('@serverless/website');
    const outputs = await website(frontendInputs);
    outputs.url = outputs.url
      .split('.')
      .map((part, i) =>
        i === 1 ? part.replace('-eu-central-1', '.eu-central-1') : part
      )
      .join('.');

    return outputs;
  }

  async remove(inputs = {}) {
    this.context.status('Removing');
    const website = await this.load('@serverless/website');

    const outputs = await website.remove(inputs);

    outputs.url = outputs.url
      .split('.')
      .map((part, i) =>
        i === 1 ? part.replace('-eu-central-1', '.eu-central-1') : part
      )
      .join('.');
    return outputs;
  }
}

module.exports = Frontend;
