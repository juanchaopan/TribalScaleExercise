# TribalScale Take-Home Exercise

## How To Run

1. Create a `.env` file in the project root and set your OpenAI API key.

Example:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_LLM_MODEL=gpt-4o-mini
OPENAI_LLM_TEMPERATURE=0.0
OPENAI_LLM_TOP_P=1.0
```

2. Update `inputText` in `src/index.ts` with the text you want summarized.

3. Run:

```bash
npm run dev
```

Then observe the structured JSON output in the console.
