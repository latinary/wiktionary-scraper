import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function translateToCroatian(data: string): Promise<string> {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `You are a translator and you translate from English to Croatian. You will translate word meanings to dictionary form. If there are duplicate translations, don't mention them.

        Translate: 1) a going away, departure; 2) a death
        1) odlazak; 2) smrt
        
        Translate: 1) discordant, harsh; 2) incongruous, inconsistent, illogical; 3) silly, stupid, senseless, absurd, worthless
        1) neskladan, oštar; 2) neskladan, nedosljedan, nelogičan; 3) glupo, besmisleno, apsurdno, bezvrijedno
        
        Translate: 1) without; 2) apart from; 3) but for
        1) bez; 2) osim; 3) ali za
        
        Translate: 1) hawk, merlin; 2) a rapacious man
        1) jastreb, sokol; 2) grabežljivac
        
        Translate: 1) (usually with dative) I lean or rest on or against something; 2) (figuratively, reflexive with se) I incline to something, lean towards
        1) nasloniti se (na); 2) nagnuti se (prema)
        
        Translate: ability
        sposobnost
        
        Translate: from, away from, out of
        od, daleko od, izvan
        
        Translate: ${data}
        `,
        max_tokens: 400,
        frequency_penalty: 0.1,
        stop: ['Translate'],
    });
    
    // @ts-ignore
    return response.data.choices[0].text;
}

export async function chatgptTranslate(data: string): Promise<string> {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "system", content: "You are a translator and you translate from English to Croatian. You will translate word meanings to dictionary form. If there are duplicate translations, mention only once." },
            { role: 'user', content: 'Translate: 1) a going away, departure; 2) a death' },
            { role: 'assistant', content: '1) odlazak; 2) smrt' },
            { role: 'user', content: 'Translate: 1) discordant, harsh; 2) incongruous, inconsistent, illogical; 3) silly, stupid, senseless, absurd, worthless' },
            { role: 'assistant', content: '1) neskladan, oštar; 2) neskladan, nedosljedan, nelogičan; 3) glupo, besmisleno, apsurdno, bezvrijedno' },
            { role: 'user', content: 'Translate: 1) without; 2) apart from; 3) but for' },
            { role: 'assistant', content: '1) bez; 2) osim; 3) ali za' },
            { role: 'user', content: 'Translate: 1) hawk, merlin; 2) a rapacious man' },
            { role: 'assistant', content: '1) jastreb, sokol; 2) grabežljivac' },
            { role: 'user', content: 'Translate: 1) (usually with dative) I lean or rest on or against something; 2) (figuratively, reflexive with se) I incline to something, lean towards' },
            { role: 'assistant', content: '1) nasloniti se (na); 2) nagnuti se (prema)' },
            { role: 'user', content: 'Translate: ability' },
            { role: 'assistant', content: 'sposobnost' },
            { role: 'user', content: 'Translate: from, away from, out of' },
            { role: 'assistant', content: 'od, daleko od, izvan' },
            { role: 'user', content: `Translate: ${data}` }
        ],
        stop: ['Translate:'],
        max_tokens: 400,
        frequency_penalty: 0.1
    });

    // @ts-ignore
    return response.data.choices[0].message?.content;
}