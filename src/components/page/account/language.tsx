import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Typography } from '~/src/components/ui/typography';

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

export const LanguageSettings = () => {
  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showRecentLanguages, setShowRecentLanguages] = useState(true);

  const recentLanguages = ['en', 'hi'];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <View className="p-4">
        {/* Header */}
        <Typography variant="heading" className="mb-6 text-xl font-bold">
          Language
        </Typography>

        {/* Recently Used */}
        {showRecentLanguages && recentLanguages.length > 0 && (
          <View className="mb-6">
            <View className="mb-2 flex-row items-center justify-between px-2">
              <Typography variant="caption" className="text-gray-500">
                RECENTLY USED
              </Typography>
              <TouchableOpacity onPress={() => setShowRecentLanguages(false)}>
                <Typography className="text-sm text-blue-600">Hide</Typography>
              </TouchableOpacity>
            </View>

            <View className="rounded-lg border border-gray-200">
              {recentLanguages.map((langCode) => {
                const lang = languages.find((l) => l.code === langCode);
                if (!lang) return null;

                return (
                  <TouchableOpacity
                    key={lang.code}
                    className={`flex-row items-center justify-between p-4 ${
                      langCode === selectedLanguage ? 'bg-blue-50' : ''
                    } ${langCode !== recentLanguages[recentLanguages.length - 1] ? 'border-b border-gray-200' : ''}`}
                    onPress={() => setSelectedLanguage(lang.code)}>
                    <View>
                      <Typography
                        className={
                          langCode === selectedLanguage ? 'font-medium text-blue-600' : ''
                        }>
                        {lang.name}
                      </Typography>
                      <Typography className="text-sm text-gray-500">{lang.nativeName}</Typography>
                    </View>
                    {langCode === selectedLanguage && (
                      <Ionicons name="checkmark" size={20} color="#3b82f6" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* All Languages */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            ALL LANGUAGES
          </Typography>

          <View className="rounded-lg border border-gray-200">
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={lang.code}
                className={`flex-row items-center justify-between p-4 ${
                  lang.code === selectedLanguage ? 'bg-blue-50' : ''
                } ${index !== languages.length - 1 ? 'border-b border-gray-200' : ''}`}
                onPress={() => setSelectedLanguage(lang.code)}>
                <View>
                  <Typography
                    className={lang.code === selectedLanguage ? 'font-medium text-blue-600' : ''}>
                    {lang.name}
                  </Typography>
                  <Typography className="text-sm text-gray-500">{lang.nativeName}</Typography>
                </View>
                {lang.code === selectedLanguage && (
                  <Ionicons name="checkmark" size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Language vs Content Language */}
        <View className="mb-6 rounded-lg bg-gray-50 p-4">
          <Typography className="mb-2 font-medium">Language Settings</Typography>
          <View className="space-y-2">
            <Typography className="text-sm text-gray-600">
              • App Language: Controls the language of the app interface
            </Typography>
            <Typography className="text-sm text-gray-600">
              • Content Language: May vary based on available translations
            </Typography>
            <Typography className="text-sm text-gray-600">
              • Some content may not be available in all languages
            </Typography>
          </View>
        </View>

        {/* Contribute */}
        <TouchableOpacity className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <View className="flex-row items-center">
            <Ionicons name="globe-outline" size={20} color="#3b82f6" />
            <Typography className="ml-2 font-medium text-blue-600">
              Help Improve Translations
            </Typography>
          </View>
          <Typography className="mt-1 text-sm text-gray-600">
            Join our community of translators to help make the app available in more languages.
          </Typography>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
