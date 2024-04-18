import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormatType, ITranslationModel, Languages } from '../types/Translation';
import { useTranslateMutation } from '../services/translationService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import styles from "../css/translation.module.css";


const TranslatePage: React.FC = () =>{

    const [inputText, setInputText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [translate, { isError, error}] = useTranslateMutation();

    const browserLanguage = navigator.language.substring(0, 2);

    const [selectedLanguage, setSelectedLanguage] = 
    useState((Languages as Record<string, Languages>)[browserLanguage] 
            ? browserLanguage as Languages 
            : Languages.en);

    const handleTranslateClick = async () => {
        try {
            
            const requestBody: ITranslationModel = {
                q: inputText,
                source: Languages.auto,
                target: selectedLanguage as Languages,
                format: FormatType.text
            };
            
            await translate(requestBody)
                .unwrap()
                .then((payload) =>{
                    setTranslatedText(payload.translatedText)
                })
                .catch((error) => {
                    console.log(error)
                });

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLanguage(event.target.value as Languages); 
     };
    
    return(
        <>
        <h1 className={styles.text}>Ban Translate page</h1> 
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
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <TextField
                            select value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            {Object.keys(Languages).map((key) => (
                                <MenuItem key={key} value={Languages[key as keyof typeof Languages]}>
                                    {Languages[key as keyof typeof Languages]}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button onClick={handleTranslateClick} variant="contained">
                        Translate
                    </Button>
                </Grid>
            </Grid>
        </div>
        </>
    );
}

export default TranslatePage