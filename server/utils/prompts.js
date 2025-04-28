const promptsObj = {
  codeDebugging: `
Act as a expert programmer, Debug given code. also explain the error , fix it and provide the corrected version with explanation and comments. point out best practices to avoid simmilar issues. 
Code:
  `,

  codeReview: `
Act as a expert reviewer, Review following code for performance bottlenecks, readability, alternative optimizations and best practices. also rate on scaleof 1-10 and suggest improvment.
Code:
  `,

  codeGeneration: `
Act as a expert programmer , generate code for given task with clean, structured format, also include comments for clarity and a brief explanation of key steps. 
Requirements:
  `,

  explainCode: `
Act as a expert program explainer, explains given code line-by-line or block-by-block in simple and beginner-friendly terms. explain purpose, key - functions / variables, controlflow and edge cases, prioritize clarity for user
Code:
  `,

convertCode: `
Act as a expert mulit language programmer, Convert the following code to the target programming language by preserve functionality , libraries and idioms. add comments for changes and add language specific note to target language.
  `,
  generateTestCases: `
  Act as a expert tester , Generate meaningful test cases covering happy path, edge cases and error handling, respond in non tabular format, which include input and expected output 
  code:
  `
};

module.exports = promptsObj;
