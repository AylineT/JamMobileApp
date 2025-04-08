import { Text } from 'tamagui'
import { Link } from 'expo-router'

type Props = {
  label: string
  linkText: string
  linkHref: string
}

export default function LinkText({ label, linkText, linkHref }: Props) {
  return (
    <Text color="gray" marginTop="4%">
      {label}{" "}
      <Link href={linkHref as any}>
        <Text color="$primary" fontWeight="bold">{linkText}</Text>
      </Link>
    </Text>
  )
}
