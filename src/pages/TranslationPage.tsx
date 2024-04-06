import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormatType, ITranslationModel, Languages } from '../types/Translation';
import { useTranslateMutation } from '../services/translationService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import styles from "../css/translation.module.css";

const TranslatePage: React.FC = () =>{

    const [inputText, setInputText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [translate, { isError, error}] = useTranslateMutation();

    const handleTranslateClick = async () => {
        try {
            console.log(navigator.language);

            const browserLanguage = navigator.language.substring(0, 2);

            const selectedLanguage = (Languages as Record<string, Languages>)[browserLanguage] 
            ? browserLanguage as Languages 
            : Languages.en;

            const requestBody: ITranslationModel = {
                q: inputText,
                source: Languages.auto,
                target: selectedLanguage as Languages,
                format: FormatType.text
            };


            const response = await translate(requestBody);
            
            if (isError) {
                throw new Error((error as FetchBaseQueryError).status.toString());
            }

            if ('data' in response && 'translatedText' in response.data) {
                setTranslatedText(response.data.translatedText);
            } else {
                throw new Error('Unexpected response format');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <div className={styles.container}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Input"
                        placeholder="Input your text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box border={1} borderColor="black" padding={2}>
                        <Typography variant="body1">{translatedText}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Button onClick={handleTranslateClick} variant="contained">
                        Translate
                    </Button>
                </Grid>
            </Grid>
        </div>
       
    );
}

export default TranslatePage