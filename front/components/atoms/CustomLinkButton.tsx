import { Text, YStack } from 'tamagui'
import { Link } from 'expo-router'

type Props = {
  text: string
  href: string
  variant?: 'primary' | 'secondary'
}

export default function CustomLinkButton({ text, href, variant = 'primary' }: Props) {
  return (
    <Link href={href as any} asChild>
      <YStack
        backgroundColor={variant === 'primary' ? '$baba' : '$white'}
        borderRadius="$sm"
        padding="$md"
        width="100%"
        alignItems="center"
        marginBottom="$sm"
      >
        <Text fontWeight="bold" fontFamily='arial' color={variant === 'primary' ? '$white' : '$black'}>
          {text}
        </Text>
      </YStack>
    </Link>
  )
}
