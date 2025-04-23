import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Typography } from '~/src/components/ui/typography';

type FAQItem = {
  question: string;
  answer: string;
};

export const HelpCenter = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I book a parking spot?',
      answer:
        'To book a parking spot, navigate to the home screen, search for your desired location, select a parking facility, choose your time slot, and confirm your booking. Payment can be made through various methods available in the app.',
    },
    {
      question: 'How can I cancel my booking?',
      answer:
        "You can cancel your booking by going to 'My Bookings' in the account section, selecting the booking you wish to cancel, and tapping the 'Cancel Booking' button. Cancellation policies vary depending on the parking facility.",
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods including credit/debit cards, UPI, digital wallets, and net banking. You can manage your payment methods in the Account > Payment Methods section.',
    },
    {
      question: 'How do I get a receipt for my booking?',
      answer:
        "Receipts are automatically generated after a successful booking and sent to your registered email address. You can also view and download receipts from the 'My Bookings' section.",
    },
    {
      question: 'What if I arrive late for my booking?',
      answer:
        'Most parking facilities offer a grace period of 15-30 minutes. If you expect to be significantly late, we recommend extending your booking through the app or contacting customer support for assistance.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header */}
        <Typography variant="heading" className="mb-6 text-xl font-bold">
          Help Center
        </Typography>

        {/* Search */}
        <View className="mb-6 flex-row items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <Typography className="ml-2 text-gray-500">Search for help...</Typography>
        </View>

        {/* Quick Help */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            QUICK HELP
          </Typography>

          <View className="flex-row flex-wrap">
            <TouchableOpacity className="m-1 rounded-lg border border-gray-200 px-4 py-2">
              <Typography>Booking Issues</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="m-1 rounded-lg border border-gray-200 px-4 py-2">
              <Typography>Payment Problems</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="m-1 rounded-lg border border-gray-200 px-4 py-2">
              <Typography>Account Settings</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="m-1 rounded-lg border border-gray-200 px-4 py-2">
              <Typography>App Features</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            FREQUENTLY ASKED QUESTIONS
          </Typography>

          <View className="rounded-lg border border-gray-200">
            {faqs.map((faq, index) => (
              <View
                key={index}
                className={index !== faqs.length - 1 ? 'border-b border-gray-200' : ''}>
                <TouchableOpacity
                  className="flex-row items-center justify-between p-4"
                  onPress={() => toggleFAQ(index)}>
                  <Typography className="flex-1 font-medium">{faq.question}</Typography>
                  <Ionicons
                    name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>

                {expandedFAQ === index && (
                  <View className="border-t border-gray-100 bg-gray-50 p-4">
                    <Typography className="text-gray-600">{faq.answer}</Typography>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Contact Support */}
        <View className="mb-6">
          <Typography variant="caption" className="mb-2 px-2 text-gray-500">
            CONTACT SUPPORT
          </Typography>

          <View className="rounded-lg border border-gray-200">
            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 p-4">
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-blue-50 p-2">
                  <Ionicons name="chatbubble-outline" size={20} color="#3b82f6" />
                </View>
                <Typography>Chat with Support</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-200 p-4">
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-blue-50 p-2">
                  <Ionicons name="mail-outline" size={20} color="#3b82f6" />
                </View>
                <Typography>Email Support</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-blue-50 p-2">
                  <Ionicons name="call-outline" size={20} color="#3b82f6" />
                </View>
                <Typography>Call Support</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Hours */}
        <View className="rounded-lg bg-gray-50 p-4">
          <Typography className="mb-2 font-medium">Support Hours</Typography>
          <Typography className="text-sm text-gray-600">
            Our support team is available Monday to Friday, 9:00 AM to 6:00 PM. Weekend support is
            available for urgent issues only.
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};
